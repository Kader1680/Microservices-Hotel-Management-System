import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="relative h-[80vh] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?hotel')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold">Welcome to Luxury Stay</h1>
            <p className="mt-4 text-lg">Experience comfort and elegance with us.</p>
          </div>
        </div>
      </header>

    

      {/* Featured Rooms */}
      <section className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["https://aremorch.com/wp-content/uploads/2016/09/The-Details-That-Matter-Top-Things-Every-Luxury-Hotel-Room-Should-Have.png", "https://www.jaypeehotels.com/blog/wp-content/uploads/2024/09/Blog-6-scaled.jpg", "https://room2.com/app/uploads/2018/05/Large-room-scaled.jpg"].map((room) => (
            <div key={room} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={`${room}`} alt="Room" className="w-full h-56 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Luxury Room</h3>
                <p className="text-gray-600 mt-2">Starting at $150/night</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-200 py-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-700">
            At Luxury Stay, we offer world-class services with top-notch hospitality.
            Our goal is to make your stay as comfortable and luxurious as possible.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
