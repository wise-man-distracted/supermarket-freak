import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategorias } from '../services';


const Header = () => {
    const [categorias, setCategorias] = useState([]);
    
    useEffect(() => {
      getCategorias().then((newCategorias) => {
        setCategorias(newCategorias);
      });
    }, []);
    
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4x1 text-white">
                            Supermarket Freak
                        </span>
                    </Link>
                </div>
                <div className="hidden md:float-left md:contents">
                    {categorias.map((categoria) => (
                        <Link key={categoria.slug} href={`/categoria/${categoria.slug}`}>
                            <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                            {categoria.nome}
                            </span>
                        </Link>
                        
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header
