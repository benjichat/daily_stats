// next
import { type NextPage } from "next";
import Head from "next/head";

// components
import { Header } from "@/components/header";
import { Stats } from "@/components/stats";

// utils
import { api } from "../utils/api";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Metrics</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Stats  />
      </main>
    </>

  );
};

export default Home;
