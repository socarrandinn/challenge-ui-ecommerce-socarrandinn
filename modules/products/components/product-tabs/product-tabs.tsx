import { Rating } from "@/components/core/rating/rating";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IProduct } from "@/interfaces/product.interface";

type Props = {
  product: IProduct;
};

// todo- solo para relleno
const ProductTabs = ({ product }: Props) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Descripción</TabsTrigger>
        <TabsTrigger value="reviews">Reseñas (127)</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Descripción del Producto</h3>
            <div className="prose max-w-none">
              <p className="mb-4">
                Nuestro Multivitamínico Premium Complex es una fórmula avanzada
                que combina vitaminas esenciales, minerales y antioxidantes para
                apoyar tu salud y bienestar general. Desarrollado con
                ingredientes de la más alta calidad y respaldado por
                investigación científica.
              </p>
              <h4 className="font-semibold mb-2">Beneficios principales:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Fortalece el sistema inmunológico</li>
                <li>Aumenta los niveles de energía</li>
                <li>Mejora la salud cardiovascular</li>
                <li>Apoya la función cerebral</li>
                <li>Promueve la salud de la piel, cabello y uñas</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Reseñas de Clientes</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      <Rating variant="preview" value={product?.rating ?? 0} />
                    </div>
                    <span className="font-medium">María González</span>
                    <span className="text-sm text-gray-500">
                      hace 2 semanas
                    </span>
                  </div>
                  <p className="text-gray-700">
                    Excelente producto, he notado más energía desde que lo tomo.
                    La calidad es muy buena y el envío fue rápido.
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
