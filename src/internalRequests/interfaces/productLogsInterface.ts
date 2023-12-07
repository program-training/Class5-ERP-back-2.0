export interface ProductsLogsInterface {
  id:string,
  product_id:string,
  action:string,
  quantity_changed:number,
  current_quantity:number,
  changed_on:string
}