## A MOVIE API MADE WITH JAVASCRIPT USING EXPRESS JS

This is a CRUD API made with javascript and express js. It connects to a postgres database.

<br>

### API Endpoints

| Method     | URL Pattern        | Description                             |
|------------|--------------------|-----------------------------------------|
| **GET**    | `"/v1/movies"`     | Lists all movies in the database        |
| **GET**    | `"/v1/movie/:id`   | Gets only one movies with matching id   |
| **POST**   | `"/v1/movie`       | Creates new movie                       |
| **PATCH**  | `"/v1/movies/:id"` | Updates movie matching the requested id |
| **DELETE** | `"/v1/movie/:id"`  | Deletes movie with matching id          |

<br>

### *Body Payload for POST Request*

The Body parameters should be written in this way to avoid errors:<br>
```
{
    "title": "Moana",
    "year": 2016,
    "runtime": "107 mins",
    "genres": ["animation", "adventure"]
}
```

**NOTE:** If any key used which is not specified in the example, an error is returned.

<br>

### *Body Payload for PATCH Request*

A Partial update is done :<br>
```
{
    "runtime": "106 mins"
}
```

**NOTE:** The above example is acceptable.



