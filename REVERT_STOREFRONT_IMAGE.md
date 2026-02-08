# Revert: Client storefront image (2026-01-29)

Use this file to undo the addition of the client's storefront photo (`public/storefront.jpeg`) from all four places.

## 1. Hero (homepage background)

**File:** `src/components/Hero.jsx`  
**Line:** ~16 (inside `style={{ backgroundImage: ... }}`)

**Current (with storefront):**
```js
backgroundImage: 'url(/storefront.jpeg)',
```

**Revert to:**
```js
backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1920&h=1080&fit=crop)',
```

---

## 2. About page (main image)

**File:** `src/pages/AboutPage.jsx`  
**Lines:** ~43–46 (`<img>`)

**Current (with storefront):**
```jsx
<img
    src="/storefront.jpeg"
    alt="Our salon"
    className="rounded-2xl shadow-xl"
/>
```

**Revert to:**
```jsx
<img
    src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop"
    alt="Our salon"
    className="rounded-2xl shadow-xl"
/>
```

---

## 3. Gallery (first image)

**File:** `src/data/salonData.js`  
**Array:** `galleryImages`

**Current (with storefront first):**
- First element is `"/storefront.jpeg"`
- Then the 5 Unsplash URLs

**Revert to:** Remove the first line so the array starts with:
```js
export const galleryImages = [
    "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
    // ... rest unchanged
];
```

---

## 4. Contact page (“find us” image)

**File:** `src/pages/ContactPage.jsx`  
**Lines:** ~84–90 (map placeholder block)

**Current (with storefront):**
```jsx
<img
    src="/storefront.jpeg"
    alt={language === 'sq' ? 'GentleCutx – lokacioni ynë' : 'GentleCutx – our location'}
    className="rounded-xl w-full h-64 object-cover"
/>
```

**Revert to:**
```jsx
<div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
    <div className="text-center text-gray-500">
        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>{language === 'sq' ? 'Harta e disponueshme' : 'Map integration available'}</p>
    </div>
</div>
```

---

## 5. Remove the image file (optional)

**File to delete:** `public/storefront.jpeg`

---

*Added: 2026-01-29. Image source: client WhatsApp – GentleCut storefront at night.*
