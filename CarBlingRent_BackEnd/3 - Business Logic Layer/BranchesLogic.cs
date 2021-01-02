using System.Collections.Generic;
using System.Linq;

namespace CarBlingRent
{
    public class BranchesLogic : BaseLogic
    {
        public List<BranchModel> GetAllBranches()
        {
            return DB.Branches.Select(b => new BranchModel(b)).ToList();
        }

        public BranchModel GetOneBranch(int id)
        {
            return DB.Branches.Where(b => b.BranchId == id).Select(m => new BranchModel(m)).SingleOrDefault();
        }

        public BranchModel AddBranch(BranchModel branchModel)
        {
            Branch branch = branchModel.ConvertToBranch();
            DB.Branches.Add(branch);
            DB.SaveChanges();
            branchModel.ID = branch.BranchId;
            return branchModel;
        }

        public BranchModel UpdateFullBranch(BranchModel branchModel)
        {
            Branch branch = DB.Branches.SingleOrDefault(b => b.BranchId == branchModel.ID);

            if (branch == null)
                return null;

            branch.BranchName = branchModel.Name;

            DB.SaveChanges();

            return branchModel;
        }
    }
}
