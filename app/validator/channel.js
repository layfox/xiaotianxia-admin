import { LinValidator, Rule } from 'lin-mizar';

// class BookSearchValidator extends LinValidator {
//   constructor () {
//     super();
//     this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
//   }
// }

class CreateOrUpdateChannelValidator extends LinValidator {
  constructor () {
    super();
    this.title = new Rule('isNotEmpty', '必须传入频道名');
  }
}

export { CreateOrUpdateChannelValidator };
