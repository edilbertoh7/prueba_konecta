<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Productsale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::all();
        return $products;
    }

    public function store(Request $request)
    {
        $product = new Product();
        $this->validate($request, [
            'name_product' => 'required',
            'reference' => 'required',
            'price' => 'required',
            'weight' => 'required',
            'category_id' => 'required',
        ]);

        $id = $this->getProduct($request->reference, $request->category_id, $request->name_product, 'id');

        if ($id) { // si el priducto existe se actualiza el stock
            $stock = $this->getProduct($request->reference, $request->category_id, $request->name_product, 'stock');
            $request['stock'] = $request->stock + $stock;
            return $this->update($request, $id);
        }

        $product->name_product = $request->name_product;
        $product->reference = $request->reference;
        $product->price = $request->price;
        $product->weight = $request->weight;
        $product->category_id = $request->category_id;
        $product->stock = $request->stock;
        $product->creation_date = date('Y-m-d');
        $product->save();
        return response()->json([
            'message' => 'Producto creado correctamente'
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['mensaje'=>'No existe un producto con id ' . $id]);
        }
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $this->validate($request, [
            'name_product' => 'required',
            'reference' => 'required',
            'price' => 'required',
            'weight' => 'required',
            'category_id' => 'required',
        ]);
        $idProducts =  Product::where('id', '=', $id)->pluck('id');
        foreach ($idProducts as $idProduct) {
            $idProduct;
            if ($idProduct) {
                $product->name_product = $request->name_product;
                $product->reference = $request->reference;
                $product->price = $request->price;
                $product->weight = $request->weight;
                $product->category_id = $request->category_id;
                $product->stock = $request->stock;
                $product->creation_date = date('Y-m-d');
                $product->save();
                return response()->json([
                    'message' => 'Producto actualizado correctamente'
                ]);
            }
        }
        return response()->json([
            'message' => 'no se encotro un producto con id ' . $id
        ]);
    }
    public function destroy($id)
    {
        $product = Product::destroy($id);
        if (!$product) {
            return response()->json(['mensaje'=>'No existe un producto con id ' . $id]);
        }
        return response()->json([
            'message' => 'El producto ha sido eliminado'
        ]);
    }

    public function saleProduct(Request $request)
    {
        $productsales = new Productsale();
        $this->validate($request, [
            'product_id' => 'required',
            'sale_id' => 'required',
            'quantity' => 'required',
            'price' => 'required',

        ]);

        $productsales->product_id = $request->product_id;
        $productsales->sale_id = $request->sale_id;
        $productsales->quantity = $request->quantity;
        $productsales->price = $request->price;
        $productsales->total = $request->quantity * $request->price;

        $id_sales  = Productsale::where('sale_id', '=', $request->sale_id)->pluck('sale_id');
        foreach ($id_sales as $id_sale) {
            return response()->json([
                'message' => 'Ya existe una venta con id ' . $id_sale . ' por favor ingrese otro id'
            ]);
        }

        $product = Product::find($request->product_id);
        if (!$product) {
            return response()->json([
                'message' => 'No se encotro un producto con id ' . $request->product_id
            ]);
        }
        //$productsales->save();
        $stocks = Product::where('id', '=', $request->product_id)->pluck('stock');
        foreach ($stocks as $stock) {
            $stock;
        }
        $stock = $stock - $request->quantity;
        if ($stock < 0) {
            return response()->json([
                'message' => 'La cantidad de productos a vender es mayor al stock disponible',
                'stock' => $stock,
            ]);
        }
        $productsales->save();
        //actualiza el stock del producto
        DB::update('update products set stock = ? where id = ?', [$stock, $request->product_id]);
        return response()->json([
            'message' => 'venta realizada correctamente',
            'stock' => $stock,

        ]);
    }

    public function getProduct($reference, $category_id, $name_product, $id)
    {
        $items = Product::where('reference', '=', $reference)
            ->where('category_id', '=', $category_id)
            ->where('name_product', '=', $name_product)->pluck($id);
        foreach ($items as $item) {
            return $item;
        }
    }
}
