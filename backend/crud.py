from bson import ObjectId
from .models import ProductModel

async def get_products(db):
    products = await db.products.find().to_list(100)
    return [ProductModel(**p) for p in products]

async def get_product(db, id: str):
    product = await db.products.find_one({"_id": ObjectId(id)})
    if not product:
        return None
    return ProductModel(**product)

async def create_product(db, product: ProductModel):
    prod = product.dict(by_alias=True)
    prod.pop("id", None)
    result = await db.products.insert_one(prod)
    prod["_id"] = result.inserted_id
    return ProductModel(**prod)

async def update_product(db, id: str, product: ProductModel):
    prod = product.dict(by_alias=True)
    prod.pop("id", None)
    result = await db.products.update_one({"_id": ObjectId(id)}, {"$set": prod})
    if result.modified_count == 0:
        return None
    updated = await db.products.find_one({"_id": ObjectId(id)})
    return ProductModel(**updated)

async def delete_product(db, id: str):
    result = await db.products.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
