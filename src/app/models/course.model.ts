/**
 * Course/Supplier Model
 * Represents a course or educational resource
 */
export interface Course {
  id: number;
  supplierName: string;
  contactPerson: string;
  description?: string;
  thumbnail?: string;
}

/**
 * Open Library Book response
 * Used for external API integration
 */
export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_id?: number;
  isbn?: string[];
}
