import binascii
import sys

def image_to_hex(image_path):
    try:
        with open(image_path, 'rb') as f:
            binary_data = f.read()
        hex_data = binascii.hexlify(binary_data).decode('ascii')
        return "0x" + hex_data
    except FileNotFoundError:
        return f"Error: Image file not found at {image_path}"
    except Exception as e:
        return f"An error occurred: {e}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python image_converter.py <path_to_image_file>")
        sys.exit(1)
    
    image_file_path = sys.argv[1]
    hex_string = image_to_hex(image_file_path)
    
    if hex_string.startswith("Error:") or hex_string.startswith("An error occurred:"):
        print(hex_string)
    else:
        print(f"Hex string for {image_file_path}:")
        print(hex_string)
        # You might want to pipe this to a file or copy it directly