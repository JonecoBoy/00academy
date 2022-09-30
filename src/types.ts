// todo separar os types?
const TYPES = {
  ListCoursesInterface: Symbol.for(`ListCoursesInterface`),
  CreateCourseInterface: Symbol.for(`CreateCourseInterface`),
  SearchCourseInterface: Symbol.for(`SearchCourseInterface`),
  UpdateCourseInterface: Symbol.for(`UpdateCourseInterface`),
  DeleteCourseInterface: Symbol.for(`DeleteCourseInterface`),

  ListUsersInterface: Symbol.for(`ListUsersInterface`),
  CreateUserInterface: Symbol.for(`CreateUserInterface`),
  SearchUserInterface: Symbol.for(`SearchUserInterface`),
  SearchCustomUserInterface: Symbol.for(`SearchCustomUserInterface`),
  UpdateUserInterface: Symbol.for(`UpdateUserInterface`),
  DeleteUserInterface: Symbol.for(`DeleteUserInterface`),

  AuthLoginInterface: Symbol.for(`AuthLoginInterface`),


  CourseRepositoryInterface: Symbol.for(`CourseRepositoryInterface`),
  UsersRepositoryInterface: Symbol.for(`UsersRepositoryInterface`),

  CustomMiddleware: Symbol.for(`CustomMiddleware`),

  EmailServiceInterface: Symbol.for("EmailServiceInterface"),
};

export default TYPES;
