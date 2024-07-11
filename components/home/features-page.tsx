import React from 'react';
import { Features } from "./features";

const FeaturesPage = () => {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
    
                    <div className="w-full max-w-5xl mx-auto pt-8">
                        <Features />
                    </div>
            </div>
        </section>
    )
}

export default FeaturesPage;
