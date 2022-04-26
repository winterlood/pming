declare module "@types" {
  export namespace common_types {
    interface api_result_base {
      status: "success" | "fail";
    }
    interface api_success<T> extends api_result_base {
      status: "success";
      data: T;
    }
    interface api_failed extends api_result_base {
      status: "fail";
      error: any;
    }
  }
  export namespace github_types {
    interface Discussion {
      id: string;
      number: string;
      url: string;
      title: string;
      createdAt: string;
      body: string;
      category: {
        name: string;
        description: string;
      };
      author: {
        login: string;
        avatarUrl: string;
        url: string;
      };
    }
  }
}
