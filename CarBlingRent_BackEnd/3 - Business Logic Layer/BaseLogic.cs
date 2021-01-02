using System;

namespace CarBlingRent
{
    public abstract class BaseLogic : IDisposable
    {

        protected readonly CarBlingRentContext DB = new CarBlingRentContext();
        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
