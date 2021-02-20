namespace Services.Transformers
{
    using Models;
    using System.Threading.Tasks;

    public abstract class BaseTransformer<T>
        where T: BaseModel, new()
    {
        public abstract Task<T> Transform(T t);
    }
}
