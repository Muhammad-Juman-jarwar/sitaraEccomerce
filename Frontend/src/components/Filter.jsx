const Filter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4">Category</h3>

      {["all", "men", "women", "child"].map((cat) => (
        <label key={cat} className="flex items-center gap-2 mb-2 cursor-pointer">
          <input
            type="radio"
            name="category"
            value={cat}
            checked={selectedCategory === cat}
            onChange={() => onCategoryChange(cat)}
          />
          {cat === "child" ? "Kids" : cat.toUpperCase()}
        </label>
      ))}
    </div>
  );
};

export default Filter;
