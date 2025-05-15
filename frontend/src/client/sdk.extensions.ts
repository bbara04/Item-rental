/**
 * This file contains extensions to the auto-generated SDK functions
 * to support functionality that is not yet available in the SDK.
 */

import { client } from './client.gen';
import { type ItemRequest } from './types.gen';

/**
 * Create a new item
 * This is a manual implementation since the createItem function 
 * is not yet available in the auto-generated SDK.
 */
export const createItem = async (payload: Omit<ItemRequest, 'id'>) => {
  try {
    const response = await client.fetch('/items', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      return { data: null, error: data };
    }
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
