import getDiscussionById from "lib/get-discussion-by-id";
import getOpengraph from "lib/get-opengraph";
import parseDiscussionBody from "lib/parse-discussion-body";
import Head from "next/head";
import { useRouter } from "next/router";

interface Props {
  discussion_number: string;
  dicussion_id: string;
  title: string;
  thumbnail_url: string;
  descript: string;
  redirect_url: string;
}

const ContritubePage = (props: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <div>프밍 기고 컨텐츠로 이동합니다 😆</div>
        <div>조금만 기다려주세요...</div>
      </>
    );
  } else {
    if (typeof window !== "undefined") {
      if (process.env.NODE_ENV === "development") {
        console.log("이동 : ", props.redirect_url);
      } else {
        window.location.replace(props.redirect_url);
      }
    }
    return (
      <div>
        <Head>
          <meta
            property="og:url"
            content={`https://pming.kr/c/${props.dicussion_id}`}
          />
          <meta property="og:image" content={props.thumbnail_url} />
          <meta property="og:site_name" content={"프밍"} />
          <meta
            property="og:title"
            content={`${props.discussion_number}번 기고 - ${props.title}`}
          />
          <meta property="og:description" content={props.descript} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${props.discussion_number}번 기고 - ${props.title}`}
          />
          <meta name="twitter:description" content={props.descript} />
          <meta name="twitter:image" content={props.thumbnail_url} />
        </Head>
        <div>프밍 기고 컨텐츠로 이동합니다 😆</div>
        <div>조금만 기다려주세요...</div>
      </div>
    );
  }
};

export function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(ctx): Promise<{ props: Props }> {
  const { slug } = ctx.params;

  const discussionData = await getDiscussionById(slug);
  if (discussionData.status === "fail") {
    throw new Error("fail");
  }

  const parsedData = parseDiscussionBody(discussionData.data.body);

  const ogData = await getOpengraph(parsedData.content_url);

  return {
    props: {
      discussion_number: discussionData.data.number,
      dicussion_id: discussionData.data.id,
      title: discussionData.data.title,
      thumbnail_url: ogData.thumbnail_url,
      descript: parsedData.descript,
      redirect_url: discussionData.data.url,
    },
  };
}

export default ContritubePage;
