import { PreviewRentalItem } from "./PreviewRentalItem";

export class ExampleData {
    public static readonly exampleRentalItems: PreviewRentalItem[] = [
        {
            id: 1,
            name: "Lenovo Thinkpad T550",
            imageUrl:
                "https://th.bing.com/th?id=OPEC.e3rW9O4WkeIX%2fg474C474&w=200&h=150&rs=1&o=5&pid=21.1",
            available: 4,
            description:
                "Erőteljes és megbízható Lenovo Thinkpad T550, ideális munkához és napi használatra. Kiváló teljesítmény, hosszú akkumulátor-üzemidő és ergonomikus kialakítás jellemzi.",
            rentLink: "/lenovo-T550",
            category: "Lenovo",
            price: 15000,
        },
        {
            id: 2,
            name: "Dell XPS 15",
            imageUrl:
                "https://th.bing.com/th?id=OPEC.Fcp5Oj8D%2bn0jJw474C474&w=200&h=150&rs=1&o=5&pid=21.1",
            available: 2,
            description:
                "Erőteljes Dell XPS 15, ideális munkához és szórakozáshoz.",
            rentLink: "/dell-xps-15",
            category: "Dell",
            price: 22000,
        },
        {
            id: 3,
            name: "HP Spectre x360",
            imageUrl:
                "https://th.bing.com/th?id=OPEC.l9xyw18wQmPG%2fA474C474&w=200&h=150&rs=1&o=5&pid=21.1",
            available: 5,
            description: "Elegáns HP Spectre x360, kiváló teljesítménnyel.",
            rentLink: "/hp-spectre-x360",
            category: "HP",
            price: 18000,
        },
        {
            id: 4,
            name: "Apple MacBook Pro 16",
            imageUrl:
                "data:image/jpeg;base64,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",
            available: 3,
            description:
                "Professzionális Apple MacBook Pro 16 hüvelykes modell.",
            rentLink: "/macbook-pro-16",
            category: "Apple",
            price: 35000,
        },
        {
            id: 5,
            name: "ASUS ROG Zephyrus G14",
            imageUrl:
                "https://dlcdnwebimgs.asus.com/gain/8D12A135-FBA7-4C6F-BB9D-A654F4398FFD/w1000/h732",
            available: 6,
            description:
                "Játékra optimalizált ASUS ROG Zephyrus G14, csúcs teljesítmény.",
            rentLink: "/asus-rog-zephyrus-g14",
            category: "ASUS",
            price: 25000,
        },
        {
            id: 6,
            name: "Microsoft Surface Laptop 4",
            imageUrl:
                "https://th.bing.com/th/id/OPEC.WEPBBcno3rlZ8Q474C474?w=200&h=150&rs=1&o=5&pid=21.1",
            available: 4,
            description:
                "Modern Microsoft Surface Laptop 4, könnyű és elegáns.",
            rentLink: "/surface-laptop-4",
            category: "Microsoft",
            price: 20000,
        },
        {
            id: 7,
            name: "Acer Predator Helios 300",
            imageUrl:
                "https://th.bing.com/th/id/OPEC.DcHK3VvZ8MPIag474C474?w=200&h=150&rs=1&o=5&pid=21.1",
            available: 7,
            description:
                "Erőteljes Acer Predator Helios 300, játékosoknak ideális választás.",
            rentLink: "/acer-predator-helios-300",
            category: "Acer",
            price: 23000,
        },
        {
            id: 8,
            name: "Razer Blade 15",
            imageUrl:
                    "data:image/jpeg;base64,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",
            available: 2,
            description:
                "Kifinomult Razer Blade 15, elegáns design és erős hardver.",
            rentLink: "/razer-blade-15",
            category: "Razer",
            price: 28000,
        },
        {
            id: 9,
            name: "MSI GS66 Stealth",
            imageUrl:
                "https://th.bing.com/th/id/OIP.29NEMplhqqqRdHAOwyG48wHaGz?w=214&h=197&c=7&r=0&o=5&pid=1.7",
            available: 8,
            description:
                "Diszkrét MSI GS66 Stealth, stílusos és erős megoldás.",
            rentLink: "/msi-gs66-stealth",
            category: "MSI",
            price: 26000,
        },
        {
            id: 10,
            name: "Lenovo Yoga 730",
            imageUrl:
                "https://th.bing.com/th?id=OPEC.dEM9jhv1%2f3Y7yQ474C474&w=200&h=150&rs=1&o=5&pid=21.1",
            available: 1,
            description:
                "Rugalmas Lenovo Yoga 730, ideális mindennapi használatra.",
            rentLink: "/lenovo-yoga-730",
            category: "Lenovo",
            price: 16000,
        },
        {
            id: 11,
            name: "Samsung Galaxy Book Flex",
            imageUrl:
                "https://th.bing.com/th/id/OIP.nBroM2IcyYtWKDrESgDGKwHaE8?w=270&h=180&c=7&r=0&o=5&pid=1.7",
            available: 3,
            description:
                "Innovatív Samsung Galaxy Book Flex, kiváló kijelzővel.",
            rentLink: "/samsung-galaxy-book-flex",
            category: "Samsung",
            price: 19000,
        },
        {
            id: 12,
            name: "Google Pixelbook Go",
            imageUrl:
                "https://th.bing.com/th/id/OIP.hTiaDI96JdBbCiDWX2XylgHaE7?w=270&h=180&c=7&r=0&o=5&pid=1.7",
            available: 5,
            description: "Kényelmes Google Pixelbook Go, gyors és praktikus.",
            rentLink: "/google-pixelbook-go",
            category: "Google",
            price: 17000,
        },
    ];
}