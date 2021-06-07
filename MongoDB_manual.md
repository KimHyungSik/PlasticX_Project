## 1. MongoDB 실행

mongodb를 실행하기 위해서 데몬(mongod)이 실행되어 있어야 한다.
아래 명령어로 mongo shell을 실행한다.

```
> sudo service mongod start <br>
> mongo
```

### 1.1 root 계정 생성

root 계정을 생성하기 위해 admin 데이터베이스를 사용한다.

```
> show databases
admin  0.000GB
config 0.000GB
local  0.000GB

> use admin
switched to db admin

> db
admin
```

## 2. Database

**use (DATABASE_NAME)** 명령어로 DB를 생성할 수 있다. 말그대로 **use**이기 때문에 생성과 동시에 그 DB를 사용한다. <br>
이미 존재하는 경우엔 현존하는 DB를 사용한다.

### 2-1. 생성

**use**를 사용해서 "mongodb_tut"이라는 DB를 생성한다.

```
> use mongodb_tut
switched to db mongodb_tut
```

현재 사용중인 DB를 확인하려면 **db** 명령어 사용

```
> db
mongodb_tut
```

DB 리스트들을 확인하려면 **show dbs** 명령어 사용

```
> show dbs
admin  0.000GB
config 0.000GB
local  0.000GB
```

**show dbs**명령어로 DB 리스트들을 확인한 결과, 방금 만든 "mongodb_tut" DB가 없다. <br>
내가 만든 DB를 리스트에서 보려면 최소 한개의 Document를 추가해야 한다.

```
> db.book.insert({"name": "MongoDB Tutorial", "author": "veloger"})
WriteResult({ "nInserted" : 1 })
```

여기에서 "book"은 **collection**을 의미한다. <br>
`"이 DB의 "book"이라는 collection에 이름은 MongoDB Tutorial이고 작가는 veloger라는 데이터를 저장해줘"` 이런 뜻

```
> show dbs
admin        0.000GB
config       0.000GB
local        0.000GB
mongodb_tut  0.000GB
```

이제 리스트에 생성된걸 볼 수 있다. <br>
그리고 추가로 **db.stats()** 로 DB 상태를 확인할 수 있다.

### 2-2. 제거

DB를 제거할땐 **db.dropDatabase()**명령어 사용한다. <br>
이 명령어를 사용하기 전엔 **use** 명령어로 삭제하고자 하는 DB를 선택해줘야 한다.

```
> use mongodb_tut
switched to db mongodb_tut

> db.dropDatabase();
{ "dropped" : "mongodb_tut", "ok" : 1 }
```

## 3. Collection

### 3-1. 생성

**db.createCollection(name, [options])** 으로 컬렉션을 생성한다. name은 컬렉션이름이고, options은 document 타입으로 구성된 해당 컬렉션의 설정값이다. <br>
options 객체의 속성들은 아래와 같다.

- capped : Boolean 타입이다. true로 설정하면 size 값을 꼭 설정해줘야하고 활성화 시킨다.
- autoIndex : Boolean타입이다. true로 설정하면 \_id 필드에 index를 자동으로 생성한다.
- size : number 타입이다. Capped collection을 위해 해당 컬렉션의 최대 사이즈를 ~byte로 지정한다.
- max : number 타입이다. 해당 컬렉션에 추가할 수 있는 최대 document 갯수를 설정한다.

예를 들면 아래와 같다.

```
> db.createCollection("platform", {
    capped: true,
    size: 6142800,
    max: 10000
    })
{ "ok" : 1 }
```

### 3-2. 조회

**show collections** : collections 리스트를 확인할 수 있다.

### 3-3. 제거

**db.컬렉션명.drop()** : collections을 제거한다.

### 3-4. 유틸

**db.old컬렉션명.renameCollection(new컬렉션명)** : collections 이름을 변경한다.

## 4. Document

### 4-1 생성

**db.컬렉션명.insert(document)** 로 document를 추가한다.<br>
예시는 위에 Database 생성쪽에 했기 때문에 생략하도록 하겠다.

### 4-2 조회

- **db.컬렉션명.find([query, projection])** 로 컬렉션의 document 리스트를 확인할 수 있다.
- 한 줄이 너무 길어 불편할 때는 끝에 .pretty()를 붙이면 json이 이쁘게 나온다.

### 4-3 제거

**db.컬렉션명.remove(criteria[, justOne])** 로 document를 제거할 수 있다. <br>
매개변수로 들어가는 객체의 속성들은 아래와 같다.

- criteria : document 타입이다. 데이터의 기준 값으로서 일치하면 기본적으로 다 삭제한다. 이 값이 { } 이면 컬렉션의 모든 데이터를 제거한다. 꼭 넣어야한다.

- justOne boolean타입이다. Optional 매개변수이며, 이 값이 true면 1개의 document만 제거한다. 이 매개변수가 생략되면 기본값은 false이고 criteria에 해당되는 모든 document를 제거한다.
