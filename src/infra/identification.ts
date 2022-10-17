import { Entity } from '@domain';
import mongoose from 'mongoose';

export function loadObjectIdentification<T extends Entity>(object: T) {
  object.id = object.id ?? new mongoose.Types.ObjectId().toString();
}
