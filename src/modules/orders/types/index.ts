import { Address } from 'modules/user/schemas/user.schema';

export type OrderedProduct = {
  product: {
    title: string;
    price: number;
    poster: string;
  };
  quantity: number;
};

export type Recepient = {
  name: string;
  phone: string;
};

export interface IOrder {
  orderСode: string; // Унікальний код замовлення
  orderStatus: string; // статус замволення (оплачено, відправлено, доставлено)
  createdAt: Date; // дата створення замовлення
  executionAt: Date; // дата успішного підтвердження замовлення
  totalPrice: number; // загальна сума замовлення
  customerPhome: string; // телефон користувача, (можливо тут буде ID)

  paymentStatus: string; // статус оплати (підтверджено, відхилено)
  paymentMethod: string; // Метод оплати (кеш, картка, по частинам)

  // масив, бо товарів може бути замовлено декілька
  products: OrderedProduct[];

  // отримувач (може відрізнятися від залогіненого користувача)
  recipient: Recepient;

  // адреса доставки (може відрізнятися від адреси залогіненого користувача)
  deliveryAddress: Address;
}
