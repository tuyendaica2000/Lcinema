export const defaultEasing = [0.6, -0.05, 0.01, 0.99];

export const defaultPageFadeInVariants = {
	initial: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	animate: { opacity: 1, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" },
	exit: { opacity: 0, transition: { duration: .6, ease: defaultEasing }, willChange: "opacity, transform" }
};

export const pageTrans = {
    transition: 'linear',
    //duration: 1,
}

