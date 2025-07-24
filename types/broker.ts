import type { IFile } from './common';
export interface IBrokerPage {
  id: number;
  documentId: string;
  rank: string;
  name: string;
  phone_number: string;
  email: string;
  description: string;
  address: string;
  schedule: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  page_url: string;
  photo: IFile;
  qr: IFile;
}
