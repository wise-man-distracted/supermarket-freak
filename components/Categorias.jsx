import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getCategorias } from '../services';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias().then((newCategorias) => {
      setCategorias(newCategorias);
    });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categorias</h3>
      {categorias.map((categoria, index) => (
        <Link key={index} href={`/categoria/${categoria.slug}`}>
          <span className={`cursor-pointer block ${(index === categorias.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{categoria.nome}</span>
        </Link>
      ))}
    </div>
  );
};

export default Categorias;