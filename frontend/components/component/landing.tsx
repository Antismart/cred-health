import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-card text-card-foreground py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="#" className="flex items-center gap-2 text-lg font-bold" prefetch={false}>
          <span>CrowdHealth</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/donate" className="text-sm font-medium hover:text-primary transition duration-300" prefetch={false}>
            Donate
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition duration-300" prefetch={false}>
            Create
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition duration-300" prefetch={false}>
            Dashboard
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline" prefetch={false}>
           About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            Connect Wallet
          </Button>
          <Link
            href="#"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            prefetch={false}
          >
            Moderator
          </Link>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <section className="col-span-1 md:col-span-2 lg:col-span-3">
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Explore Campaigns</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Browse through the latest crowdfunding campaigns to help patients in need.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    title: "Cancer Treatment for Sarah",
                    description: "Help Sarah afford life-saving cancer treatment",
                    amount: "$45,678",
                    progress: 75,
                    timeLeft: "14 days remaining",
                  },
                  {
                    title: "Wheelchair for Michael",
                    description: "Help Michael get the mobility he needs",
                    amount: "$23,456",
                    progress: 60,
                    timeLeft: "21 days remaining",
                  },
                  {
                    title: "Prosthetic Leg for Emily",
                    description: "Help Emily regain her mobility",
                    amount: "$67,890",
                    progress: 85,
                    timeLeft: "7 days remaining",
                  },
                  {
                    title: "Life-Saving Surgery for John",
                    description: "Help John get the surgery he needs to survive",
                    amount: "$125,000",
                    progress: 125,
                    timeLeft: "Campaign Ended",
                  },
                  {
                    title: "Mobility Assistance for Lisa",
                    description: "Help Lisa regain her independence with a new wheelchair",
                    amount: "$89,765",
                    progress: 110,
                    timeLeft: "Campaign Ended",
                  },
                  {
                    title: "Hearing Aids for David",
                    description: "Help David hear the world around him",
                    amount: "$32,100",
                    progress: 90,
                    timeLeft: "3 days remaining",
                  },
                ].map((campaign, index) => (
                  <Card key={index} className="bg-card text-card-foreground shadow-md">
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-medium">{campaign.title}</div>
                          <div className="text-sm text-muted-foreground">{campaign.description}</div>
                        </div>
                        <div className="text-primary font-medium">{campaign.amount}</div>
                      </div>
                      <div className="mt-4">
                        <Progress value={campaign.progress} aria-label={`${campaign.progress}% funded`} />
                        <div className="text-xs text-muted-foreground mt-1">{`${campaign.progress}% funded, ${campaign.timeLeft}`}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
