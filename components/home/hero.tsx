import Image from "next/image";
import BlurIn from "../custom/blur-in";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { FileIcon, FileInput, GithubIcon } from "lucide-react";

export const Hero = () => {
    return (
        <section className="w-full py-12 items-center justify-center">
            <Blur />
            <div className="container flex flex-col items-center justify-center px-4 md:px-6 space-y-20">
                <div className="text-center space-y-4">
                    <BlurIn word="Spiral" className="text-7xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[100px]/none" />
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                        Introducing a powerful platform that helps you to chat with security and ease.
                    </p>
                    <Button className="mt-4">
                        Get Started
                    </Button>
                </div>
                <Blur />
                <div className="w-full max-w-4xl md:max-w-6xl mx-auto relative">
                    <div className="relative rounded-2xl bg-gray-800 p-4 shadow-lg">
                        <div className="rounded-lg overflow-hidden border-4 border-gray-700">
                            <AspectRatio ratio={16 / 10} className="bg-black">
                                <Image 
                                    src="/hero.gif"
                                    alt="hero"
                                    fill
                                    className="object-cover"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </div>
                <Companies />
            </div>
        </section>
    )
}

export function Blur() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none"
        >
            <div className="fix-safari-blur blur-[106px] h-56 bg-gradient-to-br from-violet-500 to-purple-400 dark:from-fuchsia-700"></div>
            <div className="fix-safari-blur blur-[106px] h-32 bg-gradient-to-r from-fuchsia-400 to-purple-300 dark:to-violet-600"></div>
        </div>
    );
}

export function Companies() {
  
    const entries = [
      {
        url: 'https://wyze.com',
        component: (
          <div key="wyze">
            <FileIcon />
          </div>
        ),
      },
      {
        url: 'https://metamask.io',
        component: (
          <div key="metamask">
            <div className="flex font-mono items-center gap-3 text-xl font-semibold">
              <FileIcon />
            </div>
          </div>
        ),
      },
      {
        url: 'https://hackclub.com',
        component: (
          <div key="hackclub">
            <FileIcon />
          </div>
        ),
      },
      {
        url: 'https://texts.com',
        component: (
          <div key="texts">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <FileIcon />
            </div>
          </div>
        ),
      },
      {
        url: 'https://opensauced.pizza/',
        component: (
          <div key="opensauced">
            <FileIcon />
          </div>
        ),
      },
    ];
  
    return (
      <div className="mt-36 text-center lg:mt-32">
        <div className="uppercase text-sm font-semibold tracking-wider text-zinc-600 dark:text-zinc-400">
          Trusted by
          <span className="dark:text-white text-black semibold">3M+</span>{' '}
          users
        </div>
        <div className="slider">
          <div className="slide-track-5 hover:pause mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 justify-around items-center">
            {[...entries, ...entries].map(({ component, url }, i) => (
              <div
                className="w-[12rem] relative grayscale opacity-60 hover:opacity-100 transition duration-200 hover:grayscale-0"
                key={i}
              >
                <a
                  href={url}
                  target="_blank"
                  className="flex justify-center w-full"
                >
                  {component}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }