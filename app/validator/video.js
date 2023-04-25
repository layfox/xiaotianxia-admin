import { LinValidator, Rule } from 'lin-mizar';

// class BookSearchValidator extends LinValidator {
//   constructor () {
//     super();
//     this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
//   }
// }

class CreateVideoValidator extends LinValidator {
  constructor () {
    super();
    this.channel = new Rule('isNotEmpty', '必须传入频道');
    this.name = new Rule('isNotEmpty', '必须传入视频名');
    this.videoPath = new Rule('isNotEmpty', '必须传入视频地址');
  }
}

export { CreateVideoValidator };
