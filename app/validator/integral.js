import { LinValidator, Rule } from 'lin-mizar';

// class BookSearchValidator extends LinValidator {
//   constructor () {
//     super();
//     this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
//   }
// }

class CreateOrUpdateIntegralValidator extends LinValidator {
  constructor () {
    super();
    this.userid = new Rule('isNotEmpty', '必须传入用户ID');
    this.available = new Rule('isNotEmpty', '必须传入可用积分');
    this.total = new Rule('isNotEmpty', '必须传入总积分');
  }
}

export { CreateOrUpdateIntegralValidator };
