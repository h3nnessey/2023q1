import { Component } from '../components/component';

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

export interface GetCarsResponse {
  total: number;
  items: ICar[];
}

export interface EngineSpecs {
  velocity: number;
  distance: number;
}

export type ServiceOptions = '_page' | '_limit' | 'id' | 'status';

export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface ComponentConstructor {
  tagName?: keyof HTMLElementTagNameMap;
  classNames?: string[];
  parent?: Component | null;
  text?: string;
  html?: string;
}

export type InputType = 'color' | 'text';
