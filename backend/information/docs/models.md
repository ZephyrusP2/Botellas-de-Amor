# Information models

## Project Model

The `Project` model is responsible for storing information about projects.

### Fields

- `id`: The unique identifier of the project. _(Primary Key)_
- `name`: The name of the project. _(String, Required)_
- `description`: The description of the project. _(String, Required)_
- `image`: The image associated with the project. _(Image, Required)_
- `status`: The status of the project. _(String, Required)_
- `goal_tons`: The goal of the project in tons. _(String, Required)_
- `total_tons`: The total amount of tons collected. _(String, Required)_
- `organizations`: A list of organizations associated with the project. _(String, Required)_
- `location`: The location of the project. _(String, Required)_

## Fact Model

The `Fact` model is responsible for storing information about facts.

### Fields

- `id`: The unique identifier of the fact. _(Primary Key)_
- `message`: The message of the fact. _(String, Required)_
