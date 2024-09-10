/**
 * v0 by Vercel.
 * @see https://v0.dev/t/r06z7Jv7K8k
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Cancer Survivor's Story</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Samantha\'s Journey to Recovery
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Samantha was diagnosed with stage 3 breast cancer in 2020. Despite the challenges, she remained positive
                and is now cancer-free. Help support her continued recovery and medical expenses.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Donate Now
                </Link>
              </div>
            </div>
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Samantha"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Samantha\'s Story
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  In 2020, Samantha was diagnosed with stage 3 breast cancer. Despite the devastating news, she remained
                  positive and determined to beat the disease. She underwent intensive chemotherapy, radiation, and a
                  mastectomy, all while juggling the demands of her job and family.
                </p>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Throughout her treatment, Samantha\'s medical expenses quickly added up, putting a significant
                  financial strain on her and her family. The funds raised through this campaign will help cover the
                  cost of her ongoing medical care, including follow-up appointments, medications, and any additional
                  procedures she may need.
                </p>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Samantha is now cancer-free and focused on her recovery. She is eager to share her story and inspire
                  others who are facing similar challenges. Your donation will make a meaningful difference in her life
                  and help her continue on her path to wellness.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Fundraising Progress</div>
                <div className="w-full">
                  <Progress value={75} />
                  <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                    <span>$15,000 raised</span>
                    <span>$20,000 goal</span>
                  </div>
                </div>
                <div className="w-full max-w-md space-y-2">
                  <form className="flex gap-2">
                    <Input type="number" placeholder="Enter donation amount" className="max-w-lg flex-1" />
                    <Button type="submit">Donate</Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    All donations are tax-deductible.{" "}
                    <Link href="#" className="underline underline-offset-2" prefetch={false}>
                      Terms &amp; Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="flex items-center">
          <img
            src="/placeholder.svg"
            width="100"
            height="30"
            alt="Crowdhealth"
            className="mr-4"
            style={{ aspectRatio: "100/30", objectFit: "cover" }}
          />
        </div>
        <p className="text-xs text-muted-foreground">&copy; CrowdHealth Foundation. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}