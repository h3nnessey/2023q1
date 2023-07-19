export enum EngineStatus {
  Start = 'started',
  Stop = 'stopped',
  Drive = 'drive',
}

export interface DriveResponse {
  success: boolean;
}

export enum FetchMethods {
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Delete = 'DELETE',
}

export interface EngineSpecs {
  velocity: number;
  distance: number;
}

export type ServiceOptions = '_page' | '_limit' | 'id' | 'status';

export interface CarResponse {
  id: number;
  name: string;
  color: string;
}
