import { useState } from 'react';
import { useAppContext } from '../../AppContextProvider'; // Added import

export default function ContactPanel() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const { baseColor } = useAppContext(); // Added baseColor
  const style = { '--user-bg-color': baseColor } as React.CSSProperties; // Added style object

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook into your API/send email endpoint
    console.log('send contact form', form);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-6">
          Have a question or feedback? Drop us a line and we’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[var(--user-bg-color)]"
              placeholder="Your name"
              style={style} // Added style
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[var(--user-bg-color)]"
              placeholder="you@example.com"
              style={style} // Added style
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[var(--user-bg-color)]"
              placeholder="What’s this about?"
              style={style} // Added style
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2
                         focus:outline-none focus:ring-2 focus:ring-[var(--user-bg-color)]"
              placeholder="Write your message here…"
              style={style} // Added style
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-[var(--user-bg-color)] hover:bg-blue-700 text-white font-medium
                       px-6 py-2 rounded-md transition"
            style={style} // Added style
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
