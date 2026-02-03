import { getImagePath } from "./utils";

export interface CoffeeShop {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    website: string;
    image: string;
}

export const COFFEE_SHOPS: CoffeeShop[] = [
    {
        id: 1,
        name: "Amami Kitchen",
        description: "A beloved culinary spot offering a blend of high-quality Italian espresso and American coffee bar options, alongside mouthwatering baked goods and paninis.",
        lat: 40.96112008888467,
        lng: -76.88692162812505,
        address: "103 S 6th St, Lewisburg, PA 17837",
        phone: "(570) 490-7857",
        website: "https://www.amamiespresso.com",
        image: getImagePath("/images/shops/amami-kitchen.jpg")
    },
    {
        id: 2,
        name: "Culture Coffee",
        description: "A modern coffee shop focusing on unique brewing methods for specialty coffee and traditional techniques for matcha. Known for its 'Red Velvet Latte' and croissants.",
        lat: 40.966214038235066,
        lng: -76.88549177840001,
        address: "216 St. John St, Lewisburg, PA 17837",
        phone: "(570) 601-7903",
        website: "https://www.instagram.com/culturecoffeee_",
        image: getImagePath("/images/shops/culture-coffee.jpg")
    },
    {
        id: 3,
        name: "7th St Cafe",
        description: "Bucknell's ultimate on-campus dessert and coffee shop. A cozy spot for students and visitors to enjoy milkshakes, ice cream, and specialty espresso drinks.",
        lat: 40.95773659979501,
        lng: -76.88483933057073,
        address: "420 S 7th St, Lewisburg, PA 17837",
        phone: "(570) 577-1240",
        website: "https://www.bucknell.edu/life-bucknell/dining-services/places-eat",
        image: getImagePath("/images/shops/7th-st-cafe.jpg")
    },
    {
        id: 4,
        name: "Tastecraft Cafe",
        description: "Downtown cafe known for its in-house roasted coffee and over 20 flavors of French macarons. A perfect spot to relax with a fresh brew and a sweet treat.",
        lat: 40.962987142339166,
        lng: -76.88753610710032,
        address: "512 Market St, Lewisburg, PA 17837",
        phone: "(570) 768-5340",
        website: "https://www.tastecraftcafe.com",
        image: getImagePath("/images/shops/tastecraft-cafe.jpg")
    },
    {
        id: 5,
        name: "Paris Bakery & Café",
        description: "Authentic French bakery offering legendary croissants, pain au chocolat, and artisanal breads. Experience a taste of France in the heart of Lewisburg.",
        lat: 40.96380135223123,
        lng: -76.88561321931094,
        address: "335 Market St, Lewisburg, PA 17837",
        phone: "(570) 884-2138",
        website: "https://parisbakery.cafe",
        image: getImagePath("/images/shops/paris-bakery-caf.jpg")
    },
    {
        id: 6,
        name: "CycleUp Coffee",
        description: "A unique bike shop cafe serving as a community hub. Enjoy coffee, light bites, and bike services in a cozy, cycling-themed atmosphere.",
        lat: 40.96325677827358,
        lng: -76.88663292782749,
        address: "429 Market St, Lewisburg, PA 17837",
        phone: "(570) 413-1705",
        website: "https://www.cycleupcafe.com",
        image: getImagePath("/images/shops/cycleup-coffee.jpg")
    },
    {
        id: 7,
        name: "Cornerstone Kitchen",
        description: "Located in the Miller Center, offering fresh, healthy, and delicious cafe food. A place to connect over real food and a shared table.",
        lat: 40.96125715212586,
        lng: -76.89719763291119,
        address: "120 Hardwood Dr, Lewisburg, PA 17837",
        phone: "(570) 556-4191",
        website: "https://millercenterlewisburg.com/cornerstone-kitchen",
        image: getImagePath("/images/shops/cornerstone-kitchen.jpg")
    },
    {
        id: 8,
        name: "Gram's Eatery",
        description: "A local favorite for homestyle breakfast and brunch. Known for generous portions, locally sourced ingredients, and a welcoming atmosphere.",
        lat: 40.9648823532259,
        lng: -76.88542268394536,
        address: "21 N 3rd St, Lewisburg, PA 17837",
        phone: "(570) 522-0230",
        website: "https://www.facebook.com/gramseaterylewisburg",
        image: getImagePath("/images/shops/gram-s-eatery.jpg")
    },
    {
        id: 9,
        name: "Starbucks Coffee",
        description: "Seattle-based coffeehouse chain known for its signature roasts, light bites and WiFi availability.",
        lat: 40.98121817592506,
        lng: -76.88452326979083,
        address: "7431 Westbranch Hwy, Lewisburg, PA 17837",
        phone: "(570) 452-2370",
        website: "https://www.starbucks.com/store-locator/store/1010326/",
        image: getImagePath("/images/shops/starbucks-coffee.jpg")
    },
    {
        id: 10,
        name: "Barnes & Noble Café",
        description: "Barnes & Noble Café at Bucknell University. Serving Starbucks coffee and a variety of pastries and sandwiches in a comfortable bookstore setting.",
        lat: 40.963756201655016,
        lng: -76.88622019668863,
        address: "400 Market St, Lewisburg, PA 17837",
        phone: "(570) 577-3960",
        website: "https://bucknell.bncollege.com",
        image: getImagePath("/images/shops/barnes-noble-caf.jpg")
    },
    {
        id: 11,
        name: "Starbucks (Giant)",
        description: "Conveniently located inside Giant Food Store. Perfect for grabbing your favorite coffee while grocery shopping.",
        lat: 40.96169263125371,
        lng: -76.89522292676229,
        address: "224 Hardwood Dr, Lewisburg, PA 17837",
        phone: "(570) 523-3200",
        website: "https://www.starbucks.com",
        image: getImagePath("/images/shops/starbucks-giant.jpg")
    },
    {
        id: 12,
        name: "Dunkin'",
        description: "Long-running chain serving signature breakfast items & a variety of coffee drinks.",
        lat: 40.969956373480606,
        lng: -76.89248274516008,
        address: "600 N Derr Dr, Lewisburg, PA 17837",
        phone: "(570) 524-4900",
        website: "https://www.dunkindonuts.com",
        image: getImagePath("/images/shops/dunkin.jpg")
    },
    {
        id: 13,
        name: "Alee's Cafe",
        description: "A cozy local spot offering a variety of coffee drinks and light fare in the heart of downtown.",
        lat: 40.964708961176,
        lng: -76.8846770451187,
        address: "232 Market St, Lewisburg, PA 17837",
        phone: "(570) 523-1234",
        website: "https://www.aleescafe.com",
        image: getImagePath("/images/shops/alee-s-cafe.jpg")
    },
    {
        id: 14,
        name: "All Star Bagels",
        description: "Freshly baked bagels and coffee. A popular morning stop for locals and students.",
        lat: 40.96445033682396,
        lng: -76.88506518736742,
        address: "300 Market St, Lewisburg, PA 17837",
        phone: "(570) 524-1000",
        website: "https://www.allstarbagels.com",
        image: getImagePath("/images/shops/all-star-bagels.jpg")
    },
    {
        id: 15,
        name: "Panera Bread",
        description: "Counter-serve bakery/cafe chain serving sandwiches, salads & more, known for its bread & free WiFi.",
        lat: 40.97531008164084,
        lng: -76.8897556844414,
        address: "6951 Westbranch Hwy, Lewisburg, PA 17837",
        phone: "(570) 524-0000",
        website: "https://www.panerabread.com",
        image: getImagePath("/images/shops/panera-bread.jpg")
    },
    {
        id: 16,
        name: "Street of Shops Restaurant",
        description: "Part of a shopping village, this retro eatery serves down-home American fare & breakfast.",
        lat: 40.96779250919243,
        lng: -76.88264400489504,
        address: "100 N Water St, Lewisburg, PA 17837",
        phone: "(570) 523-0420",
        website: "https://streetofshops.net",
        image: getImagePath("/images/shops/street-of-shops.jpg")
    }
];