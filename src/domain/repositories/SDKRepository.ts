import { SDK } from '../entities/SDK';

export interface SDKRepository {
  findAll(): Promise<SDK[]>;
  findByTag(tag: string): Promise<SDK[]>;
  findByLanguage(language: string): Promise<SDK[]>;
  findByName(name: string): Promise<SDK | null>;
}
