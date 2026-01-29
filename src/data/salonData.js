export const salonInfo = {
    name: "GentleCutx",
    tagline: "Premium Barbershop Experience",
    description: {
        sq: "GentleCutx është themeluar me një vizion të thjeshtë: të ofrojë shërbime premium të berbershop në një ambient modern dhe mikpritës. Ekipi ynë i berberëve të certifikuar sjell vite përvojë dhe pasion për zanatin e tyre.",
        en: "GentleCutx was founded with a simple vision: to provide premium barbershop services in a modern, welcoming environment. Our team of certified barbers brings years of experience and a passion for their craft."
    },
    address: "Rruga Agim Ramadani, Prishtinë, Kosovë",
    phone: "+383 44 123 456",
    whatsapp: "+38344123456",
    email: "info@gentlecutx.com",
    instagram: "https://instagram.com/gentlecutx",
    facebook: "https://facebook.com/gentlecutx",
    rating: 5.0,
    reviewCount: 156,
    mapUrl: "https://maps.google.com/?q=Prishtina,Kosovo",
};

export const openingHours = [
    { day: { sq: "E Hënë", en: "Monday" }, hours: "09:00 - 20:00", isOpen: true },
    { day: { sq: "E Martë", en: "Tuesday" }, hours: "09:00 - 20:00", isOpen: true },
    { day: { sq: "E Mërkurë", en: "Wednesday" }, hours: "09:00 - 20:00", isOpen: true },
    { day: { sq: "E Enjte", en: "Thursday" }, hours: "09:00 - 20:00", isOpen: true },
    { day: { sq: "E Premte", en: "Friday" }, hours: "09:00 - 20:00", isOpen: true },
    { day: { sq: "E Shtunë", en: "Saturday" }, hours: "10:00 - 18:00", isOpen: true },
    { day: { sq: "E Diel", en: "Sunday" }, hours: { sq: "Mbyllur", en: "Closed" }, isOpen: false },
];

export const services = [
    {
        id: 1,
        category: { sq: "Prerje Flokësh", en: "Haircuts" },
        items: [
            { id: 101, name: { sq: "Prerje Klasike", en: "Classic Haircut" }, duration: 30, price: 8, description: { sq: "Shampo + prerje me gërshërë ose makinë + stilim", en: "Shampoo + scissors or clipper cut + styling" } },
            { id: 102, name: { sq: "Fade", en: "Fade Cut" }, duration: 30, price: 10, description: { sq: "Fade modern me linja të pastra", en: "Modern fade with clean lines" } },
            { id: 103, name: { sq: "Flokë të Gjatë", en: "Long Hair Cut" }, duration: 40, price: 12, description: { sq: "Stilim për flokë të gjatë", en: "Styling for longer hair" } },
            { id: 104, name: { sq: "Prerje për Fëmijë", en: "Kids Haircut" }, duration: 25, price: 6, description: { sq: "Për fëmijë nën 12 vjeç", en: "For children under 12" } },
            { id: 105, name: { sq: "Rruajtje Koke", en: "Head Shave" }, duration: 20, price: 7, description: { sq: "Rruajtje e plotë e kokës", en: "Complete head shave with razor" } },
        ]
    },
    {
        id: 2,
        category: { sq: "Mjekër", en: "Beard" },
        items: [
            { id: 201, name: { sq: "Rregullim Mjekre", en: "Beard Trim" }, duration: 15, price: 5, description: { sq: "Formësim dhe prerje me gërshërë ose makinë", en: "Shape and trim with scissors or clippers" } },
            { id: 202, name: { sq: "Stilim Mjekre", en: "Beard Styling" }, duration: 25, price: 8, description: { sq: "Formësim i plotë i mjekrës me linja", en: "Full beard shaping with line-up" } },
            { id: 203, name: { sq: "Rruajtje Tradicionale", en: "Traditional Shave" }, duration: 30, price: 10, description: { sq: "Peshqir i nxehtë + rruajtje me brisk", en: "Hot towel + straight razor shave" } },
        ]
    },
    {
        id: 3,
        category: { sq: "Paketa", en: "Packages" },
        items: [
            { id: 301, name: { sq: "Prerje + Mjekër", en: "Haircut + Beard" }, duration: 45, price: 12, description: { sq: "Paketë e plotë kujdesi", en: "Complete grooming package" } },
            { id: 302, name: { sq: "Paketa VIP", en: "VIP Package" }, duration: 60, price: 20, description: { sq: "Prerje + mjekër + trajtim fytyre", en: "Haircut + beard + face treatment" } },
            { id: 303, name: { sq: "Paketa Dhëndër", en: "Groom Package" }, duration: 75, price: 35, description: { sq: "Stilim i plotë për raste speciale", en: "Complete styling for special occasions" } },
        ]
    }
];

export const barbers = [
    {
        id: 1,
        name: "Driton",
        role: { sq: "Berber Kryesor", en: "Master Barber" },
        experience: 8,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
        specialties: { sq: ["Prerje Klasike", "Fade"], en: ["Classic Cuts", "Fades"] }
    },
    {
        id: 2,
        name: "Arben",
        role: { sq: "Berber Senior", en: "Senior Barber" },
        experience: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        specialties: { sq: ["Stile Moderne", "Mjekër"], en: ["Modern Styles", "Beard"] }
    },
    {
        id: 3,
        name: "Besart",
        role: { sq: "Berber", en: "Barber" },
        experience: 3,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        specialties: { sq: ["Stilim Mjekre", "Prerje Fëmijësh"], en: ["Beard Styling", "Kids Cuts"] }
    }
];

export const reviews = [
    { id: 1, author: "Ardi K.", rating: 5, text: { sq: "Berberi më i mirë në qytet! Driton gjithmonë bën punë perfekte.", en: "Best barbershop in town! Driton always delivers a perfect cut." }, date: { sq: "2 ditë më parë", en: "2 days ago" } },
    { id: 2, author: "Leart M.", rating: 5, text: { sq: "Atmosferë e shkëlqyer dhe shërbim profesional. Rekomandoj!", en: "Great atmosphere and professional service. Highly recommend!" }, date: { sq: "1 javë më parë", en: "1 week ago" } },
    { id: 3, author: "Rinor H.", rating: 5, text: { sq: "Paketa VIP është fantastike. Vlen çdo cent.", en: "The VIP package is amazing. Worth every penny." }, date: { sq: "2 javë më parë", en: "2 weeks ago" } },
    { id: 4, author: "Blend S.", rating: 5, text: { sq: "Më në fund gjeta berberin tim. Pastër, profesional, dhe i aftë.", en: "Finally found my go-to barbershop. Clean, professional, and skilled." }, date: { sq: "3 javë më parë", en: "3 weeks ago" } },
];

export const galleryImages = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop",
];
