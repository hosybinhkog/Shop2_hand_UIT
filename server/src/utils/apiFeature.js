class ApiFutures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }
  filter() {
    const queryCopy = { ...this.queryString };
    console.log(queryCopy + ' ::: query copy');

    const removeFields = ['keywords', 'page', 'limit'];

    removeFields.forEach((key) => delete queryCopy[key]);

    let queryString = JSON.stringify(queryCopy);
    console.log(queryString);

    queryString = queryString.replace(/\b(t|gte|lt|lte)\b/g, (key) => `$${key}`);

    console.log(queryString);
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFutures;
