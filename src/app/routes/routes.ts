// src/app/routes/routes.ts

import noPageFoundIndex from "../pages/noPageFound/noPageFound.index.ts";
import { login } from "../pages/user/login.example.ts";
import { logout } from "../pages/user/logout.example.ts";
import { register } from "../pages/user/register.example.ts";

import { CreateTodo } from "../pages/todo/create.todo.ts";
import { ListTodo } from "../pages/todo/list.todo.ts";
import { TodoApp } from "../pages/todo/todo.wrapper.ts";

type RouteParams = {
  path: any;
  linkLabel?: string;
  content: any;
  isAuthenticated?: boolean;
};

const routes: RouteParams[] = [
  {
    path: "/",
    linkLabel: "Home",
    content: TodoApp,
    isAuthenticated: true
  },
  {
    path: "/login",
    linkLabel: "Login",
    content: login,
  },
  {
    path: "/register",
    linkLabel: "Signup",
    content: register,
  },
  {
    path: "/logout",
    linkLabel: "Logout",
    content: logout,
  },
  
  // Todo routes
  {
    path: "/todo",
    linkLabel: "To-Do List",
    content: TodoApp,
    isAuthenticated: true
  },
  {
    path: "/todo-create",
    linkLabel: "Create To-Do",
    content: CreateTodo,
    isAuthenticated: true
  },
  {
    path: "/todo-list",
    linkLabel: "List To-Do",
    content: ListTodo,
    isAuthenticated: true
  },

  // 404 Must always be at the bottom
  {
    path: "/404",
    linkLabel: "404",
    content: noPageFoundIndex,
  }
];

export default routes;