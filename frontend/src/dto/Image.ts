export interface Image {
    id: number;
    entityType: string | null;
    entityId: number | null;
    imageData: string | null; // Representing byte[] as base64 string or URL
    contentType: string | null;
    fileName: string | null;
    createdAt: string; // Representing LocalDateTime as string
    updatedAt: string; // Representing LocalDateTime as string
}
