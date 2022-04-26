import { common_types, github_types } from "@types";
import axios from "axios";

const DiscussionFragment = `#graphql
fragment DiscussionFragment on Discussion{
  id
  number
  title
  url
  upvoteCount
  author {
    login
    avatarUrl
    url
  }
  body
  category {
    id
    name
  }
  createdAt
  reactions {
    totalCount
  }
}
`;

function buildBody(discussion_id) {
  return `#graphql
    ${DiscussionFragment}
    query {
      node(id:"${discussion_id}") {
        ...DiscussionFragment
      }
    }
  `;
}

export default async function getDiscussionById(
  discussion_id
): Promise<
  common_types.api_success<github_types.Discussion> | common_types.api_failed
> {
  const access_token = process.env.GH_ACCESS_TOKEN;
  const data = buildBody(discussion_id);
  return await axios({
    url: "https://api.github.com/graphql",
    method: "post",
    headers: {
      Authorization: access_token ? `token ${access_token}` : null,
    },
    data: {
      query: data,
    },
  })
    .then((res) => ({
      status: "success" as "success",
      data: res.data.data.node as unknown as github_types.Discussion,
    }))
    .catch((err) => ({
      status: "fail" as "fail",
      error: err,
    }));
}
