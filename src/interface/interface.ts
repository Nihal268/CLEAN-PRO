
export interface ICartItemsListRequest {
  itemId: string;
  quantity: number;
}

export type IDeliveryModeParams = 'default' | 'express';