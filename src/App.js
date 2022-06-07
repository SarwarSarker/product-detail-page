import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, getProduct } from "./features/product/productSlice";

function App() {
  const product = useSelector(getProduct);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  // const priceOption = product.variation?.skus.map((s) => s.price);

  // const imageOptions = product.variation?.props[0]?.values;


  const filterImage = product.variation?.props[0];
  const filterSize = product.variation?.props[1];

  const handleColor = (id) => {
    const imageColor = filterImage?.values.find((c) => c.id === id);
    setColor(imageColor.title);
  };

  const handleSize = (id) => {
    const shoeSize = filterSize?.values.find((c) => c.id === id);
    setSize(shoeSize.title);
  };


  // const imgOptions = product.variation?.props.map((p) =>
  //   p.values.map((c) => c.id)
  // );


  return (
    <>
      <section className="bg-gray-400">
        <div className="container px-16 py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="grid grid-cols-2">
              {product.gallery?.map((image, index) => (
                <div className="" key={index}>
                  <img src={image.url} alt="" className="w-100 h-100" />
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="bg-yellow-200 px-4 py-3">
                <h4 className="text-xl font-semibold">{product.title}</h4>
              </div>
              <div className="bg-white px-4 py-5">
                <h4 className="text-xl font-bold">
                  Price: ${product.price?.discounted}
                  <span className="text-gray-400 line-through ml-2">
                    ${product.price?.old}
                  </span>
                </h4>
              </div>
              <div className="bg-white px-3 py-4">
                <p className="text-lg font-semibold">
                  {filterImage?.name} : {color}
                </p>
                <div className="flex gap-3 py-2">
                  {filterImage?.values.map((x) => (
                    <div
                      className="border border-black rounded p-3 cursor-pointer"
                      key={x.id}
                    >
                      <img
                        src={x.image}
                        alt="img"
                        className="w-20 h-20 "
                        onClick={() => handleColor(x.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="text-lg font-medium">
                  {filterSize?.name} : {size}
                </p>
                <div className="py-2 space-x-2">
                  {filterSize?.values.map((x) => (
                    <button
                      className="px-6 py-1 border border-gray-500 rounded text-gray-600 text-lg"
                      key={x.id}
                      onClick={() => handleSize(x.id)}
                    >
                      {x.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
