/**
 * Announcement Model
 * Represents a system announcement or notification
 */
export interface Announcement {
  id: number;
  title: string;
  body: string;
  date: string;
  scheduledDate: string;
  tag: string;
}
