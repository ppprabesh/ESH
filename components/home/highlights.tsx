export default function Highlights() {
  return (
    <>
      {/* Shop Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Handcrafted with Love</h3>
              <p className="text-muted-foreground">
                Each item in our collection is created by skilled local artisans using traditional techniques passed down through generations.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"></path><path d="M4 5v16a1 1 0 0 0 1 1h12"></path><path d="M4 10h11"></path><path d="M8 15h6"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Cultural Heritage</h3>
              <p className="text-muted-foreground">
                Our products celebrate Nepal&apos;s rich cultural heritage and artistic traditions, bringing a piece of our heritage to your home.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                By purchasing from us, you&apos;re directly supporting local artisans and helping to preserve traditional Nepali craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
