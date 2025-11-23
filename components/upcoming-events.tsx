import { Calendar, MapPin, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"

const events = [
  {
    id: 1,
    title: "Canadiens vs Bruins",
    date: "SAM 24 FÉV",
    time: "19:00",
    venue: "Centre Bell",
    image: "https://images.unsplash.com/photo-1515895309288-a3a6610bd1f4?q=80&w=2064&auto=format&fit=crop",
    category: "Sports",
    price: "Dès 120$",
  },
  {
    id: 2,
    title: "Charlotte de Witte",
    date: "VEN 1 MARS",
    time: "22:00",
    venue: "Place Bell",
    image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?q=80&w=2074&auto=format&fit=crop",
    category: "Techno",
    price: "Dès 85$",
  },
  {
    id: 3,
    title: "Igloofest Final Week",
    date: "SAM 8 FÉV",
    time: "18:00",
    venue: "Vieux-Port",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    category: "Festival",
    price: "Sold Out",
  },
]

export function UpcomingEvents() {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white">
          À ne pas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">manquer</span>
        </h2>
        <Button variant="link" className="text-primary font-heading uppercase">
          Voir le calendrier
        </Button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="group flex flex-col md:flex-row bg-card border border-border hover:border-primary transition-colors overflow-hidden"
          >
            <div
              className="md:w-1/4 h-48 md:h-auto bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{ backgroundImage: `url('${event.image}')` }}
            />

            <div className="flex-1 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center justify-center bg-secondary border border-border p-3 w-20 h-20 text-center">
                  <span className="text-primary font-heading font-bold text-xl uppercase leading-none">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-white font-heading font-bold text-2xl leading-none my-1">
                    {event.date.split(" ")[1]}
                  </span>
                  <span className="text-muted-foreground text-xs uppercase leading-none">
                    {event.date.split(" ")[2]}
                  </span>
                </div>

                <div>
                  <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1 block">
                    {event.category}
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-white uppercase mb-2">{event.title}</h3>
                  <div className="flex flex-col gap-1 text-gray-400 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2" />
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-muted-foreground uppercase">À partir de</p>
                  <p className="text-xl font-heading font-bold text-white">{event.price}</p>
                </div>
                <Button className="flex-1 md:flex-none bg-white text-black hover:bg-primary hover:text-white font-heading uppercase font-bold rounded-none px-8 h-12">
                  <Ticket className="mr-2 h-4 w-4" />
                  Billets
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
