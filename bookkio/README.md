## User API

### 회원 가입

- Method : `POST`
- URI : /join
- HTTP Status Code : 성공- 201
- Requiest Body
  ```js
  {
  	email : "사용자 입력 이메일",
  	password : "사용자 입력 비밀번호"
  }
  ```
- Response Body : None

### 로그인

- Method : `POST`
- URI : /login
- HTTP Status Code : 성공 200
- Request Body
  ```js
  {
  	email : "사용자 이메일",
  	password : "사용자 비밀번호"
  }
  ```
- Response Body : JWT Token

### 비밀번호 초기화 요청

- Method : `POST`
- URI : /reset
- HTTP Status Code : 200
- Request Body
  ```js
  {
    email: "사용자 입력 이메일";
  }
  ```
- Response Body

### 비밀번호 초기화 (수정)

- Method : `PUT`
- URI : /reset
- HTTP Status Code : 200
- Request Body
  ```js
  {
    password: "사용자가 입력한 비밀번호";
  }
  ```

## 도서 API

### 전체 도서 조회

- Method : `GET`
- URI : /books
- HTTP Status COde : 200
- Request Body
- Response Body
  ```js
  [
  	{
  		id : 도서id,
  		title : 도서 제목,
  		summary : 요약 설명,
  		author : 도서 작가,
  		price : 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	},
  		{
  		id : 도서id,
  		title : 도서 제목,
  		summary : 요약 설명,
  		author : 도서 작가,
  		price : 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	},
  		{
  		id : 도서id,
  		title : 도서 제목,
  		summary : 요약 설명,
  		author : 도서 작가,
  		price : 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	} ...
  ]
  ```

### 개별 도서 조회

- Method : `GET`
- URI : /books/:bookId
- HTTP Status Code : 200
- Request Body
- Response Body
  ```js
  {
  		id : 도서id,
  		title : 도서 제목,
  		summary : 요약 설명,
  		author : 도서 작가,
  		description : 상세 설명,
  		price : 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일,
  		pages: 쪽수,
  		liked : boolean,
  		index : 목차,
  		ibbn : isbn,
  		format : 포맷,
  		category : 카테고리
  	}
  ```

### 카테고리별 도서 목록 조회

- Method : `GET`
- URI : /books?categoryId={cartegoryId}&new={boolean}
- HTTP Status Code : 200
- Request Body
- Response Body
  ```js
  [
  	{
  		id : 도서id,
  		author : 도서 작가,
  		price: 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	},
  		{
  		id : 도서id,
  		author : 도서 작가,
  		price: 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	},
  		{
  		id : 도서id,
  		author : 도서 작가,
  		price: 가격,
  		likes : 좋아요 수,
  		pubDate : 출간일
  	}
  ]
  ```

## 장바구니 API

### 장바구니 담기

- Method : `POST`
- URI : /cart
- HTTP Status Code : 200
- Request Body
  ```js
  {
  	bookId : 도서 id,
  	count : 수량
  }
  ```

### 장바구니 조회

- Method : `GET`
- URI : /cart
- HTTP Status Code : 200
- Request Body
- Response Body
  ```js
  [
  	{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	},
  		{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	},
  		{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	}
  ]
  ```

### 장바구니 도서 삭제

- Method : `DELETE`
- URI : /cart/:bookId

### 주문 예상 상품 목록 조회

- Method : `GET`
- URI : /
- HTTP Status Code : 200
- Request Body
  ```js
  [cartItemId, cartItemId, cartItemId...]
  ```
- Response Body
  ```js
  [
  	{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	},
  		{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	},
  		{
  		id : 장바구니 도서 Id,
  		bookId : 도서 Id,
  		title : 도서 제목,
  		summary : 도서 요약,
  		count : 수량,
  		price : 가격
  	}
  ]
  ```

## 결제 (주문) API

### 결제하기

- 주문하기 = 주문 등록 = DB 주문 Data Insert = Cart에서 주문된 상품 Delete
- Method : `POST`
- URI : /orders
- HTTP Status Code : 200
- Request Body
  ```js
  {
  	items : [
  		{
  			cartItemId:장바구니 도서 ID,
  			bookId:도서 Id,
  			count : 수량
  		},
  		{
  			cartItemId:장바구니 도서 ID,
  			bookId:도서 Id,
  			count : 수량
  		},
  		{
  			cartItemId:장바구니 도서 ID,
  			bookId:도서 Id,
  			count : 수량
  		},
  	],
  	delivery : {
  		address : 주소,
  		receiver : 수령인,
  		contact : 모바일 번호
  	},
  	totalPrice : 총 주문 금액
  }
  ```

### 주문 목록 조회

- Method : `GET`
- URI : /orders
- HTTP Status Code : 200
- Request Body
- Response Body
  ```js
  [
  	{
  		order_id : 주문 id,
  		created_at : 주문일자,
  		delivery : {
  				address : 주소,
  				receiver : 수령인,
  				contact : 모바일 번호
  		},
  		bookTitle : 대표 책 제목,
  		totalPrice : 결제 금액,
  		totalCount : 총 수량
  	}
  ]
  ```

### 주문 상세 상품 조회

- Method : `GET`
- URI : /orders/:orderId
- HTTP Status Code : 200
- Request Body
- Response Body
