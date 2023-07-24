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

export interface CarWinner {
  id: number;
  wins: number;
  time: number;
}

export interface GetCarsResponse {
  total: number;
  items: ICar[];
}

export interface GetWinnersResponse {
  total: number;
  items: CarWinner[];
}

export interface EngineSpecs {
  velocity: number;
  distance: number;
}

export type ServiceOptions = '_page' | '_limit' | 'id' | 'status' | '_order' | '_sort';

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
