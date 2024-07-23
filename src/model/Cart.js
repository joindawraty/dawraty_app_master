export default class CartItemModel {
  constructor(
    id,
    name,
    newPrice,
    oldPrice,
    imageUri,
    instructorFName,
    instructorLName,
    translation,
    onSale,
    isFree,
    chapters,
  ) {
    this.chapters = chapters ?? [];
    this.courses = {
      id: id,
      name: name,
      course_sale: {
        new_price: newPrice,
        old_price: oldPrice,
        on_sale: onSale,
        is_free: isFree,
      },
      course_image: imageUri,
      instructor: {
        first_name: instructorFName,
        last_name: instructorLName,
      },
      translation: translation,
    };
  }
}
