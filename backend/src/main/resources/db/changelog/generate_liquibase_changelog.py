import os
import base64
import json

def generate_changelog():
    image_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../images'))
    changelog_dir = os.path.abspath(os.path.dirname(__file__))
    output_changelog_file = os.path.join(changelog_dir, '002_update_images_data.json')

    if not os.path.exists(image_dir):
        print(f"Image directory not found: {image_dir}")
        return

    image_files = [f for f in os.listdir(image_dir) if os.path.isfile(os.path.join(image_dir, f))]

    if not image_files:
        print(f"No images found in {image_dir}")
        return

    changes = []
    for i, image_file_name in enumerate(image_files):
        image_path = os.path.join(image_dir, image_file_name)
        try:
            with open(image_path, "rb") as img_file:
                encoded_string = base64.b64encode(img_file.read()).decode('utf-8')

            # In PostgreSQL, bytea can accept base64 directly when properly cast or handled by the driver.
            # For Liquibase, we can use the decode function for base64.
            # The SQL statement needs to handle the base64 string.
            # For BYTEA, PostgreSQL expects \\x followed by hex, or it can decode base64.
            # We will use a placeholder for the base64 string and let the PreparedStatement handle it,
            # or use a direct SQL string with proper escaping if not using PreparedStatement.
            # Since we are generating a JSON changelog with direct SQL, we will use decode for base64.

            sql_statement = f"UPDATE images SET image_data = DECODE('{encoded_string}', 'base64') WHERE file_name = '{image_file_name}' AND image_data IS NULL;"

            change_id = f"update_image_data_{image_file_name.split('.')[0]}_{i+1}"
            author = "liquibase-script"

            change = {
                "changeSet": {
                    "id": change_id,
                    "author": author,
                    "changes": [
                        {
                            "sql": {
                                "dbms": "postgresql",
                                "sql": sql_statement
                            }
                        },
                        {
                            "sql": {
                                "dbms": "mssql", # Assuming MSSQL might use a different function or handling
                                "sql": f"UPDATE images SET image_data = CAST(N'' AS XML).value('xs:base64Binary(\"{encoded_string}\")', 'VARBINARY(MAX)') WHERE file_name = '{image_file_name}' AND image_data IS NULL;"
                            }
                        }
                    ],
                    "comment": f"Update image_data for {image_file_name}"
                }
            }
            changes.append(change)
        except Exception as e:
            print(f"Error processing file {image_file_name}: {e}")

    if not changes:
        print("No changes generated.")
        return

    database_changelog = {
        "databaseChangeLog": changes
    }

    try:
        with open(output_changelog_file, 'w') as f:
            json.dump(database_changelog, f, indent=4)
        print(f"Generated Liquibase changelog: {output_changelog_file}")
    except Exception as e:
        print(f"Error writing changelog file {output_changelog_file}: {e}")

if __name__ == "__main__":
    generate_changelog()

