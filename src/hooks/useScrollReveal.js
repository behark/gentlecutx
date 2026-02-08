import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(threshold = 0.1) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

export function useScrollRevealMultiple(count, threshold = 0.1) {
    const refs = useRef([]);
    const [visibleItems, setVisibleItems] = useState(new Set());

    useEffect(() => {
        const observers = refs.current.map((element, index) => {
            if (!element) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisibleItems(prev => new Set([...prev, index]));
                        observer.unobserve(element);
                    }
                },
                { threshold, rootMargin: '0px 0px -30px 0px' }
            );

            observer.observe(element);
            return observer;
        });

        return () => observers.forEach(obs => obs?.disconnect());
    }, [count, threshold]);

    const setRef = (index) => (el) => {
        refs.current[index] = el;
    };

    return { setRef, visibleItems };
}

export function useParallax(speed = 0.5) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const scrolled = window.scrollY;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return ref;
}

export function useCountUp(end, duration = 2000, startOnVisible = true) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);
    const hasStartedRef = useRef(false);

    useEffect(() => {
        if (!startOnVisible) {
            setHasStarted(true);
            hasStartedRef.current = true;
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStartedRef.current) {
                    hasStartedRef.current = true;
                    setHasStarted(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [hasStarted, end, duration]);

    return { count, ref };
}
